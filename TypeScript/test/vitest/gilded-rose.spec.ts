import { Item, FacerStore, ItemType } from "@/facer-store";

describe("Facer Store", () => {
  it("should foo", () => {
    const facerStore = new FacerStore([new Item("foo", 0, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe(ItemType.DefaultWatch, () => {
  it("Should degrade quality by 1", () => {
    const facerStore = new FacerStore([new Item(ItemType.DefaultWatch, 5, 2)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(4);
  });

  it("Should degrade quality twice as fast when sell date has passed", () => {
    const facerStore = new FacerStore([new Item(ItemType.DefaultWatch, 0, 4)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Should never degrade quality below 0", () => {
    const facerStore = new FacerStore([new Item(ItemType.DefaultWatch, -2, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-3);
  });
});

describe(ItemType.FragileWatch, () => {
  it("Should degrade quality by 2", () => {
    const facerStore = new FacerStore([new Item(ItemType.FragileWatch, 5, 2)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(4);
  });

  it("Should degrade quality twice as fast when sell date has passed", () => {
    const facerStore = new FacerStore([new Item(ItemType.FragileWatch, 0, 4)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Should never degrade quality below 0", () => {
    const facerStore = new FacerStore([new Item(ItemType.FragileWatch, -2, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-3);
  });
});

describe(ItemType.VintageRolex, () => {
  it("Should increase when SellIn still positive", () => {
    const facerStore = new FacerStore([new Item(ItemType.VintageRolex, 5, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(4);
  });

  it("Should double increase when SellIn is negative", () => {
    const facerStore = new FacerStore([new Item(ItemType.VintageRolex, -1, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(-2);
  });

  it("Should never increase quality above 50", () => {
    const facerStore = new FacerStore([new Item(ItemType.VintageRolex, 5, 50)]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });
});

describe(ItemType.LegendaryWatchFace, () => {
  it("Should remain the same", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.LegendaryWatchFace, -1, 80),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe(ItemType.PassesToWatchfaceConference, () => {
  it("Should increases quality by 1 when there are 11 days or more.", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 12, 40),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(41);
    expect(items[0].sellIn).toBe(11);
  });

  it("Should increase quality by 2 when there are 10 days or less.", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 10, 40),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(42);
    expect(items[0].sellIn).toBe(9);
  });

  it("Should increase quality by 3 when there are 5 days or less.", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 5, 40),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(43);
    expect(items[0].sellIn).toBe(4);
  });

  it("Should increase quality by 3 when there are 5 days or less but should never pass 50.", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 5, 48),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  it("Should drop quality to 0 after the conference.", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 0, 40),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Should never increase quality above 50", () => {
    const facerStore = new FacerStore([
      new Item(ItemType.PassesToWatchfaceConference, 5, 50),
    ]);
    const items = facerStore.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });
});
