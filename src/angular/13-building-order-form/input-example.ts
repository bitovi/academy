@Component({
  selector: 'bank-account',
  template: `
    Bank: {{bank.name}}
    Account Id: {{id}}
  `
})
class BankAccount {
  // This property is bound using its original name.
  @Input() bank: {
    name: string,
    code: string
  };
  // this property value is bound to a different property name
  // when this component is instantiated in a template.
  @Input('account-id') id: string;
  // this property is not bound, and is not automatically updated by Angular
  normalizedBankName: string;
}
 
@Component({
  selector: 'app',
  template: `
    <bank-account [bank]="bankInfo" account-id="4747"></bank-account>
  `
})
 
class App {
  bankInfo = {
    name: 'Really Cool Bank',
    code: 'RCB'
  }
}