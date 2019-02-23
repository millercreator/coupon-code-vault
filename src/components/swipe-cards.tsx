"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";

export type CardType = {
  id: number;
  url: string;
  [key: string]: any;
};

type SwipeCardsProps = {
  cards: CardType[];
  renderCard?: (card: CardType) => React.ReactNode;
};

type CardProps = {
  card: CardType;
  index: number;
  totalCards: number;
  onSwipe: () => void;
  renderCard?: (card: CardType) => React.ReactNode;
};

const SwipeCards: React.FC<SwipeCardsProps> = ({ cards: initialCards, renderCard }) => {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  // Update cards when prop changes
  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const handleSwipe = () => {
    // Move the top card to the back of the stack (Tinder style)
    setCards((prevCards) => {
      const [topCard, ...rest] = prevCards;
      return [...rest, topCard];
    });
  };

  return (
    <div className="grid h-[500px] w-full place-items-center">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const positionFromTop = cards.length - 1 - index;
          return (
            <Card
              key={card.id}
              card={card}
              index={positionFromTop}
              totalCards={cards.length}
              onSwipe={handleSwipe}
              renderCard={renderCard}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ card, index, totalCards, onSwipe, renderCard }) => {
  const x = useMotionValue(0);
  const isTopCard = index === 0;
  const exitDirection = useRef<number>(1000); // Store exit direction

  // Reset x motion value when card position changes (fixes reverse swipe)
  useEffect(() => {
    if (!isTopCard) {
      x.set(0);
    }
  }, [index, isTopCard, x]);

  // Only rotate during drag, and only for top card
  const rotate = useTransform(x, [-300, 300], isTopCard ? [-15, 15] : [0, 0]);

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      // Store exit direction before swiping
      exitDirection.current = info.offset.x > 0 ? 1000 : -1000;
      // Swipe detected - move card off screen then to back
      onSwipe();
      // Reset x immediately to prevent reverse behavior
      x.set(0);
    } else {
      // Snap back to center
      x.set(0);
    }
  };

  // Calculate scale based on position in stack
  const scale = 1 - index * 0.05; // Each card behind is 5% smaller
  const minScale = 0.85; // Don't go smaller than 85%
  const finalScale = Math.max(scale, minScale);

  //   DO NOT REMOVE THIS
  //   // Calculate rotation for cards in stack (more tilt for visibility, but top card stays straight)
  //   // Progressive tilt: cards further back have more rotation
  //   const baseRotation = 12; // Increased from 4 to 12 degrees
  //   const progressiveTilt = index * 2; // Add extra tilt based on position
  //   const stackRotation = isTopCard
  //     ? 0
  //     : index % 2 === 0
  //     ? baseRotation + progressiveTilt
  //     : -(baseRotation + progressiveTilt);

  // // Calculate rotation for cards in stack (more tilt for visibility, but top card stays straight)
  const stackRotation = isTopCard ? 0 : index % 2 === 0 ? 12 : -12;

  // Default card renderer (original image)
  const defaultCardContent = (
    <img
      src={card.url}
      alt={`Card ${card.id}`}
      draggable={false}
      className="h-96 w-72 origin-center rounded-lg bg-white object-cover select-none"
    />
  );

  // Use custom renderer if provided, otherwise use default
  const cardContent = renderCard ? renderCard(card) : defaultCardContent;

  return (
    <motion.div
      className="origin-center rounded-lg hover:cursor-grab active:cursor-grabbing select-none"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x: isTopCard ? x : 0,
        rotate: isTopCard ? rotate : stackRotation,
        zIndex: totalCards - index,
      }}
      initial={
        isTopCard ? false : { scale: finalScale * 0.9, y: 20, opacity: 0.8 }
      }
      animate={{
        scale: finalScale,
        y: 0,
        opacity: 1,
        boxShadow: isTopCard
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : "0 10px 15px -5px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={isTopCard ? { cursor: "grabbing" } : {}}
      exit={{
        x: exitDirection.current,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      layout
    >
      {cardContent}
    </motion.div>
  );
};

export default SwipeCards;
