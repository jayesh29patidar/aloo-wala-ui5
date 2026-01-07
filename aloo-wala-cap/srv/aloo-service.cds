using aloo.wala as db from '../db/schema';

service AlooService {
  entity Dishes as projection on db.Dishes;
}
