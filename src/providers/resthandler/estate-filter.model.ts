export class EstateFilterModel {
  // Required Filter
  newSearch: boolean;
  angebot_art: string;
  ort: string;
  objektart: string;
  qm: string;
  preis: string;
  zimmeranzahl: number;
  // Zusatzfilter
  maxQm: string;
  minQm: string;
  maxPreis: string;
  minPreis: string;
  bauJahr: string;
  heizungs_art: string;
  agencyID: string;
  toJsonRequiredFilter() {
    return {
      "angebot_art": this.angebot_art,
      "ort": this.ort,
      "objektart": this.objektart,
      "qm": this.qm,
      "preis": this.preis,
      "zimmeranzahl": this.zimmeranzahl
    }
  }

  toJsonAdditionalFilter() {
    return 					{
      "minQm": this.minQm,
      "maxQm": this.maxQm,
      "minPreis": this.minPreis,
      "maxPreis": this.maxPreis,
      "bauJahr": this.bauJahr,
      "heizungs_art": this.heizungs_art,
      "agencyID": this.agencyID
    };
  }
}
