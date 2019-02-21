"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

type SnapCarouselProps<T> = {
  items: T[];
  renderItemAction?: (item: T, isLocked: boolean) => React.ReactNode;
  itemSize?: number;
  gap?: number;
  onChangeAction?: (index: number, item: T) => void;
  className?: string;
  // Space between the active item and the lock-case (px)
  lockSpacing?: number;
  // Custom styles/classes for the lock-case
  lockStyle?: React.CSSProperties;
  lockClassName?: string;
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
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        borderRadius: 12,
        border: "3px solid #111",
        boxShadow: "0 2px 0 rgba(0,0,0,0.2)",
        pointerEvents: "none",
        zIndex: 2,
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
}) {
  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        padding: `0 ${sidePadding}px`,
        height: "100%",
        transform: `translateX(${Math.round(offset)}px)`,
        transition: trackRef.current?.getAttribute("data-animate")
          ? "transform 260ms cubic-bezier(.2,.9,.2,1.02)"
          : "none",
        cursor: dragging ? "grabbing" : "grab",
        willChange: "transform",
        userSelect: "none",
      }}
    >
      {items.map((item, i) => {
        const isLocked = i === lockedIndex;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleItemClick(i)}
            style={{
              width: itemSize,
              height: itemSize,
              borderRadius: 12,
              border: "2px solid transparent",
              background: "#ddd",
              display: "grid",
              placeItems: "center",
              flex: "0 0 auto",
              transition: "opacity 200ms, transform 200ms",
              transform: `scale(${isLocked ? lockedScale : 1})`,
              opacity: isLocked ? 1 : 0.8,
              outline: "none",
              cursor: "pointer",
            }}
            tabIndex={0}
            aria-pressed={isLocked}
          >
            {renderItemAction ? (
              renderItemAction(item, isLocked)
            ) : (
              <span style={{ fontWeight: 600 }}>{String(item)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SnapCarousel<T>({
  items,
  renderItemAction,
  itemSize = 72,
  gap = 16,
  onChangeAction,
  className,
  lockSpacing = 4,
  lockStyle,
  lockClassName,
}: SnapCarouselProps<T>) {
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
  } = useSnapCarousel(items, itemSize, gap, onChangeAction);

  const lockedScale = Math.max(0, (itemSize - 2 * lockSpacing) / itemSize);

  return (
    <div
      ref={containerRef}
      className={["snap-carousel", className].filter(Boolean).join(" ")}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: itemSize,
        touchAction: "none",
        userSelect: "none",
      }}
      tabIndex={-1}
      aria-label="Snap carousel"
    >
      <LockCase size={itemSize} style={lockStyle} className={lockClassName} />
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
      />
    </div>
  );
}
