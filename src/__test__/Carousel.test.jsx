import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Corousel from "../Carousel";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Corousel images={images} />);
  const hero = await carousel.findByTestId("hero");
  const thumbnail = await carousel.findByTestId(`thumbnail-${0}`);

  expect(hero.src).toContain(images[0]);
  expect(Array.from(thumbnail.classList)).toContain("active");

  for (let i = 0; i < images.length; i++) {
    const thumbnail = await carousel.findByTestId(`thumbnail-${i}`);
    await thumbnail.click();

    expect(hero.src).toContain(images[i]);
    expect(Array.from(thumbnail.classList)).toContain("active");
  }

  carousel.unmount();
});
