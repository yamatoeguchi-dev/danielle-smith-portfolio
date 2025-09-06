'use client';

import { useEffect, useState } from 'react'

export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

  if (width === null) return "loading";

  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}