import { ItemTotalPipe } from './item-total.pipe';
import { Item } from "./order/order.service";

describe('ItemTotalPipe', () => {

  let mockItemList: Item[] = [
   {name: "Truffle Noodles", price: 14.99},
   {name: "Garlic Fries", price: 15.99}
  ]
  const pipe =  new ItemTotalPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform Item[] and get the total cost of item price', () => {
    const total = pipe.transform(mockItemList);
    expect(total).toEqual(30.98);
  });

  it('expect empty array to be 0', () => {
    const total = pipe.transform([]);
    expect(total).toBeFalsy();
  });

});
