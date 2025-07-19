import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';
import Section from './Section';

class Document extends Model {
  declare id: string;
  declare filename: string;
  declare originalName: string;
  declare readonly createdAt: Date;
  declare sections?: Section[];
}

Document.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    filename: { type: DataTypes.STRING, allowNull: false },
    originalName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'Document', tableName: 'Documents', timestamps: true }
);

// Define associations only if sequelize is available
try {
  Document.hasMany(Section, { foreignKey: 'documentId', as: 'sections' });
  Section.belongsTo(Document, { foreignKey: 'documentId' });
} catch (error) {
  // Silently fail if database is not available (e.g., during build)
  console.warn('Database associations could not be established:', error);
}

export default Document;