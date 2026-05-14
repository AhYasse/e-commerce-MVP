import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  },
  price: Number // Store price at time of adding to cart
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total price before saving
cartSchema.pre('save', async function(next) {
  
  if (!this.isModified('items')) return next();

  const productIds = this.items.map(item => item.product);
  const products = await mongoose.model('Product').find({ _id: { $in: productIds } });

  let total = 0;
  this.items.forEach(item => {
    const product = products.find(p => p._id.equals(item.product));
    if (product) {
      item.price = product.price; // Sync current price
      total += item.price * item.quantity;
    }
  });

  this.totalPrice = total;
  next();
});

let Cart = mongoose.model('Cart', cartSchema);
export default Cart