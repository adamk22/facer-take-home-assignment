export enum ItemType {
  VintageRolex = "Vintage Rolex",
  PassesToWatchfaceConference = "Passes to Watchface Conference",
  LegendaryWatchFace = "Legendary Watch Face",
  FragileWatch = "Fragile Watch",
  DefaultWatch = "Default Watch",
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class FacerStore {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private incrementQuality(item: Item, amount: number = 1) {
    item.quality = Math.min(item.quality + amount, 50);
  }

  private decrementQuality(item: Item, amount: number = 1) {
    item.quality = Math.max(item.quality - amount, 0);
  }

  private decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private handleVintageRolexChange(item: Item) {
    this.incrementQuality(item);

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      this.incrementQuality(item);
    }

    return item;
  }

  private handlePassesConferenceChange(item: Item) {
    this.incrementQuality(item);
    if (item.sellIn < 11) this.incrementQuality(item);
    if (item.sellIn < 6) this.incrementQuality(item);

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      item.quality = 0;
    }
    return item;
  }

  private handleFragileWatchChange(item: Item) {
    this.decrementQuality(item, 2);

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      this.decrementQuality(item, 2);
    }
    return item;
  }

  private handleDefaultWatchChange(item: Item) {
    this.decrementQuality(item);

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      this.decrementQuality(item);
    }
    return item;
  }

  updateQuality() {
    return this.items.map((item) => {
      switch (item.name) {
        case ItemType.LegendaryWatchFace:
          return item;
        case ItemType.VintageRolex:
          return this.handleVintageRolexChange(item);
        case ItemType.PassesToWatchfaceConference:
          return this.handlePassesConferenceChange(item);
        case ItemType.FragileWatch:
          return this.handleFragileWatchChange(item);
        default:
          return this.handleDefaultWatchChange(item);
      }
    });
  }
}
