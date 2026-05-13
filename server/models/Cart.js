const mongoose = require('mongoose');

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
  let total = 0;
  for (let item of this.items) {
    const product = await mongoose.model('Product').findById(item.product);
    if (product) {
      item.price = product.price;
      total += product.price * item.quantity;
    }
  }
  this.totalPrice = total;
  next();
});

module.exports = mongoose.model('Cart', cartSchema);