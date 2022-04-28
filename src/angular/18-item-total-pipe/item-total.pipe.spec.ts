import { ItemTotalPipe } from './item-total.pipe';
import { Item } from './order/order.service';

describe('ItemTotalPipe', () => {
  const mockItemList: Item[] = [
    { name: 'Truffle Noodles', price: 14.99 },
    { name: 'Garlic Fries', price: 15.99 },
  ];
  const pipe = new ItemTotalPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform Item[] and return the sum of each item price, total price should be 30.98', () => {
    const total = pipe.transform(mockItemList);
    expect(total).toEqual(30.98);
  });

  it('expect empty array to be 0', () => {
    const total = pipe.transform([]);
    expect(total).toEqual(0);
  });
});
