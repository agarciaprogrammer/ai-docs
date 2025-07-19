import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';
import Document from './Document';

class Section extends Model {
  declare id: string;
  declare documentId: string;
  declare title: string;
  declare content: string;
  declare orderIndex: number;
}

Section.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    documentId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    orderIndex: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'Section', tableName: 'Sections', timestamps: true }
);

export default Section;