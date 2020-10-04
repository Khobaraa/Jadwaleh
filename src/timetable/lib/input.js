'use strict';


class Input {
  constructor(input) {
    this.input = input;
    // const args = minimist(process.argv.slice(2));
    // this.methods = this.getMethods(args);
    // this.Text = args[this.methods[0]] || undefined;
    // this.Category = args[this.methods[1]];
    // this.getNotes = args[this.methods[2]];
    // this.delete = args[this.methods[3]] || undefined;
    // this.deleteFilter = this.methods[4].length > 0 && (args[this.methods[4]] != true && args[this.methods[4]].length > 0) ? {Category: args[this.methods[4]]} : {};
    // this.updateID = this.methods[5].length > 0 ? args[this.methods[5]].split(",")[0] || undefined : undefined;
    // this.update = {
    //   Text: this.methods[5].length > 0 ? args[this.methods[5]].split(",")[1] : undefined,
    //   Category: this.methods[5].length > 0 ? args[this.methods[5]].split(",")[2] : undefined
    // }
    // this.help = this.methods[6];
  }

  print() {
    console.log('printing ............>', this.input);
  }

  getMethods(args) {
    let addMethod = '';
    let categoryMethod = 'N/A';
    let getNotes = '';
    let deleteMethod = '';
    let deleteFilter = '';
    let updateMethod = '';
    let helpMethod = false;

    if (args) {
      for (let i = 1; i < Object.keys(args).length; i++) {
        let key = Object.keys(args)[i];
        if (/^a$|add$/gmi.test(key)) addMethod = key;
        if(/^c$|category$/gmi.test(key)) categoryMethod = key;
        if (/^get$/gmi.test(key)) getNotes = key;
        if (/^delete$/gmi.test(key)) deleteMethod = key;
        if (/^clear$/gmi.test(key)) deleteFilter = key;
        if (/^u$|update$/gmi.test(key)) updateMethod = key;
        if (/^h$|help$/gmi.test(key)) helpMethod = true;
      }
      return [addMethod, categoryMethod, getNotes, deleteMethod, deleteFilter, updateMethod, helpMethod];
    } else {
      return undefined;
    }
  }
}

module.exports = Input;
