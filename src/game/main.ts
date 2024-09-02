export class Game {
  private _letters: Array<string>;
  private _words = new Set();

  start() {
    this._letters = Array.from({ length: 3 }).fill(0).map(() => this.generateRandomLetter());
  }

  private generateRandomLetter() {
    const letters = 'aaabcdeeefghiiijlmnooopqrstuuuvxz';
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  public get letters() {
    return this._letters;
  }

  async validateWord(word: string): Promise<boolean> {
    console.log(this._words);
    const validated = [...this._letters];
    const replacedWord = this.replaceSpecialChars(word);
    for (let i = 0; i < word.length; i++) {
      if (validated.includes(word[i])) {
        validated.splice(validated.indexOf(word[i]), 1);
      }
    }
    if (validated.length !== 0) {
      return false;
    }

    const wordExists = await this.wordExists(word);
    if (wordExists) {
      this._words.add(replacedWord);
      return true;
    }
    return false;
  }

  private replaceSpecialChars(word: string): string {
    const replaceMapping: any = {
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ç: 'c',
      ñ: 'n',
    };

    return word.split('').map(c => replaceMapping[c] || c).join('');
  }

  private async wordExists(word: string): Promise<boolean> {
    if (this._words.has(word)) {
      return true;
    }
    const data = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
    const json = await data.json();

    if (json.length > 0) {
      this._words.add(this.replaceSpecialChars(word));
      return true;
    }
    return false;
  }
}
