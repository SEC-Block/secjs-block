const SECDatahandler = require('@biut-block/biutjs-datahandler')

const INIT_BALANCE = '1000'

class SECAccTree {
  /**
   * create a token chain block chain with config
   * @param {}
   *
   */
  constructor (config) {
    try {
      this.accTree = new SECDatahandler.AccTreeDB(config)
      this.accDB = new SECDatahandler.AccDB(config)
      this.accTree.setAccDB(this.accDB)
    } catch (e) {
      throw e
    }
  }

  newTree (root) {
    this.accTree.constructNewTree(root)
  }

  getAccInfo (accAddr, tokenname, callback) {
    this.accTree.getAccInfo(accAddr, tokenname, callback)
  }

  getBalance (accAddr, tokenName, callback) {
    this.getAccInfo(accAddr, tokenName, (err, info) => {
      if (err) callback(err, null)
      else {
        if (tokenName === 'All') {
          for (let _tokenName in info[0]) {
            info[0][_tokenName] = parseFloat(info[0][_tokenName])
          }
          callback(null, info[0])
        } else if (tokenName in info[0]) {
          callback(null, {[tokenName]: info[0][tokenName]})
        } else {
          callback(null, {[tokenName]: INIT_BALANCE})
        }
      }
    })
  }

  getNonce (accAddr, callback) {
    this.getAccInfo(accAddr, 'All', (err, info) => {
      if (err) callback(err, null)
      else {
        callback(null, info[1])
      }
    })
  }

  clearDB (callback) {
    this.accTree.clearDB(callback)
  }

  checkRoot (root, callback) {
    this.accTree.checkRoot(root, callback)
  }

  getRoot () {
    return this.accTree.getRoot()
  }

  updateWithBlockChain (blockchain, callback) {
    this.accTree.updateWithBlockChain(blockchain).then(() => {
      callback()
    }).catch((err) => {
      callback(err)
    })
  }

  updateWithBlock (block, callback) {
    this.accTree.updateWithBlock(block).then(() => {
      callback()
    }).catch((err) => {
      callback(err)
    })
  }

  revertWithBlock (block, callback) {
    this.accTree.revertBlock(block).then(() => {
      callback()
    }).catch((err) => {
      callback(err)
    })
  }
}

module.exports = SECAccTree
