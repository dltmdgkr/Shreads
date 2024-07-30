import { useRef, useState, useCallback } from "react";

export function useDraggableScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [moveX, setMoveX] = useState<number>(0);

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollRef.current) {
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
      setMoveX(e.pageX);
    }
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  const onDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDrag && scrollRef.current) {
        scrollRef.current.scrollLeft = startX - e.pageX;
      }
    },
    [isDrag, startX]
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();
      if (Math.abs(e.pageX - moveX) > 5) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [moveX]
  );

  return {
    scrollRef,
    onDragStart,
    onDragEnd,
    onDragMove,
    onClick,
    isDrag,
  };
}
