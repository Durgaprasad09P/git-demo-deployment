
import LightningDataTable from 'lightning/dataTable';
import customNameTemplate from './customName.html';
import customRankTemplate from './customRank.html';
import customImageTemplate from './customImage.html';

export default class CustomDataType extends LightningDataTable {
  static customTypes = {
    customNameType: {
      template: customNameTemplate,
      standardCellLayout: true,
      typeAttributes: ['contactName']
    },
    customRank: {
      template: customRankTemplate,
      standardCellLayout: false,
      typeAttributes: ['rankIcon']
    },
    customImage: {
      template: customImageTemplate,
      standardCellLayout: true,
      typeAttributes: ['imageUrl']
    }
  };
}