"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

type SnapCarouselClassNames = {
  /**
   * Class name for the carousel root container.
   */
  root?: string;
  /**
   * Class name for the carousel track (the scrolling flex row of items).
   */
  track?: string;
  /**
   * Class name for every carousel item.
   */
  item?: string;
  /**
   * Class name for the currently locked (active/centered) carousel item.
   */
  activeItem?: string;
  /**
   * Class name for the lock-case overlay element.
   */
  lock?: string;
};

/**
 * Props for the SnapCarousel component.
 *
 * @template T - The type of the item in the carousel.
 */
type SnapCarouselProps<T> = {
  /**
   * The array of items to display in the carousel.
   */
  items: T[];

  /**
   * Optional custom rendering function for each item.
   * @param item - The item to render.
   * @param isLocked - Whether this item is currently "locked" (active/centered).
   * @returns The React node to render.
   */
  renderItemAction?: (item: T, isLocked: boolean) => React.ReactNode;

  /**
   * The size (width and height) of each carousel item, in pixels.
   * Defaults to 72.
   */
  itemSize?: number;

  /**
   * The space (gap) between carousel items, in pixels.
   * Defaults to 16.
   */
  gap?: number;

  /**
   * Callback fired when the locked (centered) item changes.
   * @param index - Index of the new active/locked item.
   * @param item  - The new active/locked item.
   */
  onChangeAction?: (index: number, item: T) => void;

  /**
   * Additional CSS class for the carousel container.
   */
  className?: string;

  /**
   * Space (in pixels) between the active item and the lock-case overlay.
   * This makes the lock-case border appear inset.
   * Defaults to 4.
   */
  lockSpacing?: number;

  /**
   * Custom React style object for the lock-case overlay.
   */
  lockStyle?: React.CSSProperties;

  /**
   * Optional class names for different carousel elements.
   * Allows for polymorphic styling (e.g., via Tailwind or CSS Modules).
   */
  classNames?: SnapCarouselClassNames;

  /**
   * Optional per-item override function to customize item props (class/style/aria).
   * Useful for special styling, aria attributes, etc., on a per-item basis.
   * @param item - The item.
   * @param index - The index of the item.
   * @param isLocked - Whether this item is currently locked.
   * @returns Additional props to spread onto the item button.
   */
  getItemPropsAction?: (
    item: T,
    index: number,
    isLocked: boolean
  ) => {
    className?: string;
    style?: React.CSSProperties;
    [ariaAttr: `aria-${string}`]: any;
  };

  /**
   * Imperative scrolling method, provided for advanced use.
   * Usually not needed unless you want to control carousel scroll from outside.
   * @param index - The index to scroll to.
   * @param animate - Whether to animate the scroll. Defaults to true.
   */
  scrollToIndex?: (index: number, animate?: boolean) => void;
};

const SIDE_PADDING = 24;

// Helper: clamp a value between min and max (inclusive)
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function useSnapCarousel<T>(
  items: T[],
  itemSize: number,
  gap: number,
  onChangeAction?: (index: number, item: T) => void
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [lockedIndex, setLockedIndex] = useState(0);

  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);

  // Precompute per‑item center positions (track local coords)
  const step = itemSize + gap;
  const positions = useMemo(
    () => items.map((_, i) => i * step + SIDE_PADDING),
    [items, step]
  );

  const getContainerCenter = useCallback(() => {
    return containerRef.current ? containerRef.current.clientWidth / 2 : 0;
  }, []);

  const offsetForIndex = useCallback(
    (i: number) => {
      const containerCenter = getContainerCenter();
      const itemCenter = positions[i] + itemSize / 2;
      return containerCenter - itemCenter;
    },
    [getContainerCenter, positions, itemSize]
  );

  // Center the given index
  const centerIndex = useCallback(
    (i: number, animate = true) => {
      if (!containerRef.current) return;
      const index = clamp(i, 0, items.length - 1);
      setLockedIndex(index);
      setOffset(Math.round(offsetForIndex(index)));
      if (onChangeAction) onChangeAction(index, items[index]);

      if (!trackRef.current) return;
      if (animate) {
        trackRef.current.setAttribute("data-animate", "1");
        // Remove animate flag after the snap for immediate drag next time
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            trackRef.current?.removeAttribute("data-animate");
          });
        });
      } else {
        trackRef.current.removeAttribute("data-animate");
      }
    },
    [items, offsetForIndex, onChangeAction]
  );

  useLayoutEffect(() => {
    centerIndex(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSize, gap, items.length]);

  // Pointer handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setDragging(true);
      startXRef.current = e.clientX;
      startOffsetRef.current = offset;
      trackRef.current?.removeAttribute("data-animate");
    },
    [offset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startXRef.current;
      setOffset(startOffsetRef.current + dx);
    },
    [dragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);

    // Find the index whose center is closest to the container center
    const containerCenter = getContainerCenter();
    let closestIdx = 0;
    let minDist = Infinity;
    positions.forEach((pos, idx) => {
      const itemCenterOnScreen = pos + itemSize / 2 + offset;
      const dist = Math.abs(itemCenterOnScreen - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    centerIndex(closestIdx, true);
  }, [dragging, getContainerCenter, itemSize, offset, positions, centerIndex]);

  const handleItemClick = useCallback(
    (i: number) => {
      centerIndex(i, true);
    },
    [centerIndex]
  );

  // Provide an imperative scrollToIndex
  const scrollToIndex = useCallback(
    (i: number, animate: boolean = true) => {
      centerIndex(i, animate);
    },
    [centerIndex]
  );

  return {
    containerRef,
    trackRef,
    offset,
    dragging,
    lockedIndex,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleItemClick,
    scrollToIndex,
  };
}

function LockCase({
  size,
  style,
  className,
}: {
  size: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  // Note: we use inline styles for variable dimensions that can't be handled with static Tailwind classes,
  // but all visual style and static layout is in className.
  return (
    <div
      aria-hidden
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[12px] border-[3px] border-[#111] shadow-[0_2px_0_0_rgba(0,0,0,0.2)] pointer-events-none z-[2]",
        className
      )}
      style={{
        width: "var(--snap-item-size)",
        height: "var(--snap-item-size)",
        ...style,
      }}
    />
  );
}

function CarouselTrack<T>({
  items,
  renderItemAction,
  itemSize,
  gap,
  sidePadding,
  offset,
  dragging,
  lockedIndex,
  trackRef,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  handleItemClick,
  lockedScale,
  classNames = {},
  getItemPropsAction,
}: {
  items: T[];
  renderItemAction?: (item: T, isLocked: boolean) => React.ReactNode;
  itemSize: number;
  gap: number;
  sidePadding: number;
  offset: number;
  dragging: boolean;
  lockedIndex: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerMove: (e: React.PointerEvent) => void;
  handlePointerUp: () => void;
  handleItemClick: (i: number) => void;
  lockedScale: number;
  classNames?: SnapCarouselClassNames;
  getItemPropsAction?: (
    item: T,
    index: number,
    isLocked: boolean
  ) => {
    className?: string;
    style?: React.CSSProperties;
    [ariaAttr: `aria-${string}`]: any;
  };
}) {
  // For dynamic styles that cannot be encoded in Tailwind, we still use style
  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "flex items-center h-full select-none",
        dragging ? "cursor-grabbing" : "cursor-grab",
        classNames.track
      )}
      style={{
        gap: "var(--snap-gap)",
        padding: `0 var(--snap-side-padding)`,
        transform: `translateX(${Math.round(offset)}px)`,
        transition: trackRef.current?.getAttribute("data-animate")
          ? "transform 260ms cubic-bezier(.2,.9,.2,1.02)"
          : "none",
        willChange: "transform",
        userSelect: "none",
      }}
    >
      {items.map((item, i) => {
        const isLocked = i === lockedIndex;
        const itemProps = getItemPropsAction?.(item, i, isLocked) ?? {};
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleItemClick(i)}
            className={cn(
              "rounded-[12px] border-2 border-transparent grid place-items-center focus:outline-none transition duration-200 flex-shrink-0 cursor-pointer",
              classNames.item,
              isLocked && classNames.activeItem,
              itemProps.className
            )}
            style={{
              width: "var(--snap-item-size)",
              height: "var(--snap-item-size)",
              flex: "0 0 auto",
              transform: `scale(${isLocked ? lockedScale : 1})`,
              opacity: isLocked ? 1 : 0.8,
              ...itemProps.style,
            }}
            tabIndex={0}
            aria-pressed={isLocked}
            {...itemProps}
          >
            {renderItemAction ? (
              renderItemAction(item, isLocked)
            ) : (
              <span className="font-semibold">{String(item)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Forward ref so caller can call scrollToIndex
export const SnapCarousel = forwardRef(function SnapCarousel_<T>(
  {
    items,
    renderItemAction,
    itemSize = 72,
    gap = 16,
    onChangeAction,
    className,
    lockSpacing = 4,
    lockStyle,
    classNames = {},
    getItemPropsAction,
  }: SnapCarouselProps<T>,
  ref: React.Ref<
    { scrollToIndex: (index: number, animate?: boolean) => void } | undefined
  >
) {
  const {
    containerRef,
    trackRef,
    offset,
    dragging,
    lockedIndex,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleItemClick,
    scrollToIndex,
  } = useSnapCarousel(items, itemSize, gap, onChangeAction);

  const lockedScale = Math.max(0, (itemSize - 2 * lockSpacing) / itemSize);

  // Expose scrollToIndex via ref
  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex,
    }),
    [scrollToIndex]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden touch-none select-none",
        className,
        classNames.root
      )}
      style={{
        // CSS custom properties for theming
        ["--snap-item-size" as any]: `${itemSize}px`,
        ["--snap-gap" as any]: `${gap}px`,
        ["--snap-side-padding" as any]: `${SIDE_PADDING}px`,
        ["--snap-lock-spacing" as any]: `${lockSpacing}px`,
        height: "var(--snap-item-size)",
      }}
      tabIndex={-1}
      aria-label="Snap carousel"
    >
      <LockCase
        size={itemSize}
        style={lockStyle}
        className={cn(classNames.lock)}
      />
      <CarouselTrack
        items={items}
        renderItemAction={renderItemAction}
        itemSize={itemSize}
        gap={gap}
        sidePadding={SIDE_PADDING}
        offset={offset}
        dragging={dragging}
        lockedIndex={lockedIndex}
        trackRef={trackRef}
        handlePointerDown={handlePointerDown}
        handlePointerMove={handlePointerMove}
        handlePointerUp={handlePointerUp}
        handleItemClick={handleItemClick}
        lockedScale={lockedScale}
        classNames={classNames}
        getItemPropsAction={getItemPropsAction}
      />
    </div>
  );
}) as <T>(
  props: SnapCarouselProps<T> & {
    ref?: React.Ref<{
      scrollToIndex: (index: number, animate?: boolean) => void;
    }>;
  }
) => React.ReactElement;
