import casual from "casual";
import _ from "lodash";
import mongoose from "mongoose";
import { DataTypes, Sequelize } from "sequelize";


async function connectMongo() {
  try {
    await mongoose.connect('mongodb://localhost/widgets');
    // mongoose.set('strictQuery', false);
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

connectMongo();

const widgetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  soldout: String,
  inventory: String,
  stores: Array,
});

const Widgets = mongoose.model('Widgets', widgetSchema);

const sequelize = new Sequelize('sqlite::memory:');

const Categories = sequelize.define('categories', {
  category: DataTypes.STRING,
  description: DataTypes.STRING,
});

async function syncAndSeedCategories() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Seed categories
    await Promise.all(_.times(5, () => {
      return Categories.create({
        category: casual.word,
        description: casual.sentence,
      });
    }));

        console.log('Categories seeded');
    } catch (error) {
      console.log('Error syncing and seeding:', error);
    }
}

syncAndSeedCategories();

export { Categories, Widgets };

