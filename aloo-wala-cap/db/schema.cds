namespace aloo.wala;

entity Dishes {
  key ID       : Integer;
  name         : String(100);
  category     : String(50);
  price        : Decimal(9,2);
  isHealthy    : Boolean;
}
