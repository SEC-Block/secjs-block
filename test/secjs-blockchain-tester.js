/* global describe it beforeEach after */
const SECDataHandler = require('@sec-block/secjs-datahandler')
const dbconfig = {
  DBPath: process.cwd() + '/data',
  ID: 'TestID'
}
const TxBlockchainDataHandler = new SECDataHandler.TxBlockChainDB(dbconfig)
const TokenBlockchainDataHandler = new SECDataHandler.TokenBlockChainDB(dbconfig)
const fs = require('fs-extra')
const mockData = require('./mock-data')
const assert = require('chai').assert
const should = require('chai').should()
const SECBlockchain = require('../src/index')
const mockDataStr = require('./mock-date-str')

describe('Block Tester', () => {
  describe('SEC Token Blockchain', () => {
    let tokenBlockChain
    beforeEach(() => {
      tokenBlockChain = new SECBlockchain.SECTokenBlockChain(TokenBlockchainDataHandler)
    })

    after(() => {
      fs.remove(process.cwd() + '/data/')
    })

    it('instance', () => {
      assert.typeOf(tokenBlockChain, 'Object')
    })

    it('init Token BlockChain Object', () => {
      tokenBlockChain.init(() => {
        should.exist(tokenBlockChain.getBlockChain())
        assert.equal(tokenBlockChain.getGenesisBlockHash(), 'be44ec287a0e3fb7b8a1ad0432b7f9004e399826a34b4cb9fffe17abddfccf5e')
        assert.equal(tokenBlockChain.getGenesisBlockDifficulty(), 1)
        assert.equal(tokenBlockChain.getCurrentHeight(), 0)
      })
    })

    it('Add Block to Token BlockChain', () => {
      tokenBlockChain.init(() => {
        tokenBlockChain.putBlockToDB(mockData.tokenBlock, () => {
          assert.equal(tokenBlockChain.getCurrentHeight(), 1)
          assert.equal(tokenBlockChain.getLastBlockHash(), mockData.tokenBlock.Hash)
          assert.equal(tokenBlockChain.getLastBlockDifficulty(), mockData.tokenBlock.Difficulty)
          assert.equal(tokenBlockChain.getLastBlockTimeStamp(), mockData.tokenBlock.TimeStamp)
          assert.equal(tokenBlockChain.getLastBlock(), mockData.tokenBlock)
        })
      })
    })
  })

  // describe('SEC Transaction Blockchain', () => {
  //   let transactionBlockChain
  //   beforeEach(() => {
  //     transactionBlockChain = new SECBlockchain.SECTransactionBlockChain(TxBlockchainDataHandler)
  //   })

  //   after(() => {
  //     fs.remove(process.cwd() + '/data/')
  //   })

  //   it('instance', () => {
  //     assert.typeOf(transactionBlockChain, 'Object')
  //   })

  //   it('init Transaction BlockChain Object', () => {
  //     transactionBlockChain.init(() => {
  //       should.exist(transactionBlockChain.getBlockChain())
  //       assert.equal(transactionBlockChain.getGenesisBlockHash(), 'be44ec287a0e3fb7b8a1ad0432b7f9004e399826a34b4cb9fffe17abddfccf5e')
  //       assert.equal(transactionBlockChain.getGenesisBlockDifficulty(), 1)
  //       assert.equal(transactionBlockChain.getCurrentHeight(), 0)
  //     })
  //   })

  //   it('Add Block to Transaction BlockChain', () => {
  //     transactionBlockChain.init(() => {
  //       transactionBlockChain.putBlockToDB(mockData.transactionBlock, () => {
  //         assert.equal(transactionBlockChain.getCurrentHeight(), 1)
  //         assert.equal(transactionBlockChain.getLastBlockHash(), mockData.transactionBlock.Hash)
  //         assert.equal(transactionBlockChain.getLastBlockDifficulty(), mockData.transactionBlock.Difficulty)
  //         assert.equal(transactionBlockChain.getLastBlockTimeStamp(), mockData.transactionBlock.TimeStamp)
  //         assert.equal(transactionBlockChain.getLastBlock(), mockData.transactionBlock)
  //       })
  //     })
  //   })
  // })

  describe('SEC Token Block', () => {
    it('getBlock should work', () => {
      let tokenBlock = new SECBlockchain.SECTokenBlock(mockDataStr.tokenBlock)
      assert.equal(tokenBlock.getBlock().Number, 1)
      assert.equal(tokenBlock.getBlockBuffer().length, 16)
    })
    it('getHeader should work', () => {
      let tokenBlock = new SECBlockchain.SECTokenBlock(mockDataStr.tokenBlock)
      assert.equal(tokenBlock.getHeader().TransactionsRoot, mockDataStr.tokenBlock.TransactionsRoot)
      assert.equal(tokenBlock.getHeaderBuffer().length, 14)
      assert.equal(tokenBlock.getHeaderHash(), 'f166d21b139c798e33261030c9f34c77661352822cfa4f5148cc13b758e60934')
    })
    it('getBody should work', () => {
      let tokenBlock = new SECBlockchain.SECTokenBlock(mockDataStr.tokenBlock)
      assert.equal(tokenBlock.getBody(), mockDataStr.tokenBlock.Transactions)
      assert.equal(tokenBlock.getBodyBuffer().length, 3)
      assert.equal(tokenBlock.getBodyHash(), '4e4711414bc05f865cf1d899c4cab82c07671c095d9a88fc7c3243351666f0fc')
    })
    it('getPOW should work', () => {
      let tokenBlock = new SECBlockchain.SECTokenBlock(mockDataStr.tokenBlock)
      assert.equal(tokenBlock.getPowHeaderBuffer().length, 7)
      assert.equal(tokenBlock.getPowHeaderHashBuffer().toString('hex'), 'b3dbe2f8d6c7f5414432269a4c6ad05d7e2a1c176095dce59c0467b2b5270276')
    })
  })
})
