import type { ReactNode } from "react";

/**
 * Home-page section: title in a sticky left column on desktop, content on the right.
 * The hairline at the top marks where one section ends and the next begins.
 */
export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto mt-16 max-w-[1120px] px-4 md:mt-24 md:px-8">
      <div data-reveal className="grid gap-x-8 gap-y-6 border-t border-rule pt-6 md:grid-cols-12 md:pt-8">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <h2 id={`${id}-title`} className="display text-[1.05rem] font-semibold">
              {title}
            </h2>
            {aside}
          </div>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
