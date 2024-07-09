import { Item, FacerStore } from "@/facer-store";

describe("Facer Store", () => {
  it("should foo", () => {
    const facerStore = new FacerStore([new Item("foo", 0, 0)]);
    const items = facerStore.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});
