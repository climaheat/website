import { useEffect, useRef, useState } from "react";
import { reviews, googleReviewsUrl } from "../lib/site";
import { Button } from "./ui/button";

/** Horizontale, rustig doorschuivende balk; uitsluitend echte Google-reviews. */
export function ReviewBelt({ light }: { light: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const element = viewport.current;
    if (!element || reviews.length < 2 || paused || interacting) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    const tick = (time: number) => {
      if (!motion.matches && !document.hidden) {
        const delta = previous ? Math.min(time - previous, 50) : 0;
        position += delta * 0.025;
        const half = element.scrollWidth / 2;
        if (position >= half) position -= half;
        element.scrollLeft = position;
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, interacting]);

  function move(direction: number) {
    setPaused(true);
    const element = viewport.current;
    if (!element) return;
    const card = element.querySelector("figure");
    element.scrollLeft += direction * ((card?.getBoundingClientRect().width ?? 320) + 16);
  }

  return (
    <div className="mt-10" role="region" aria-label="Google-reviews van klanten">
      <div ref={viewport} className="overflow-x-auto overscroll-x-contain" tabIndex={0}
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
        onTouchStart={() => setPaused(true)}>
        <div className="flex w-max">
          {[0, ...(reviews.length > 1 ? [1] : [])].map((copy) => (
            <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
              {reviews.map((review, index) => (
                <figure key={`${review.author}-${index}`} className={`flex w-[min(82vw,24rem)] shrink-0 flex-col rounded-md border p-6 ${light ? "border-ink-foreground/20 bg-ink-foreground/10" : "border-border bg-card"}`}>
                  <p className="text-ember" aria-label={`${review.rating} op 5 sterren`}>{"★".repeat(review.rating)}<span className="opacity-25">{"★".repeat(5 - review.rating)}</span></p>
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed">“{review.text}”</blockquote>
                  <figcaption className="mt-5 border-t border-current/15 pt-4 text-sm">
                    <span className="font-semibold">{review.author}</span>
                    {review.date && <span className="ml-2 opacity-65">{review.date}</span>}
                    <a href={review.url ?? googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block underline underline-offset-4">Bekijk op Google ↗</a>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      {reviews.length > 1 && <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" size="icon" aria-label="Vorige reviews" onClick={() => move(-1)}><span aria-hidden="true">←</span></Button>
        <Button variant="outline" size="icon" aria-label={paused ? "Reviews laten doorschuiven" : "Reviews pauzeren"} onClick={() => setPaused((value) => !value)}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></Button>
        <Button variant="outline" size="icon" aria-label="Volgende reviews" onClick={() => move(1)}><span aria-hidden="true">→</span></Button>
      </div>}
    </div>
  );
}