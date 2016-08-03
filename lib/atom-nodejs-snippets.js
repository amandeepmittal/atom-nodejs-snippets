'use babel';

import AtomNodejsSnippetsView from './atom-nodejs-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomNodejsSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomNodejsSnippetsView = new AtomNodejsSnippetsView(state.atomNodejsSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomNodejsSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-nodejs-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomNodejsSnippetsView.destroy();
  },

  serialize() {
    return {
      atomNodejsSnippetsViewState: this.atomNodejsSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomNodejsSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
