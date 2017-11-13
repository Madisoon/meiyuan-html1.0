/**
 * Created by Msater Zg on 2017/1/6.
 */
define(function (require, exports, module) {
    // 立即执行函数实现模块化
    // 通过 require 引入依赖
    /* require('http://localhost:63343/service-html/spm_modules/layer/layer.js');*/
    //地址，参数（为对象），方法请求成功
    var baseUrl = 'http://127.0.0.1:8090/';
    /*const baseUrl = 'http://121.43.171.195:8090/'*/
    var getDataWay = function (url, params, httpType, success) {
        //发送ajax请求
        $.ajax({
            url: url,
            type: httpType,
            dataType: 'JSON',
            data: params,
            beforeSend: function (request) {
                request.setRequestHeader('webToken', "123")
            },
            success: function (rep) {
                success(rep)
            },
            error: function () {
            }
        })
    };
    //客户相关的所有的接口
    // 自行执行函数
    var book = (function () {
        var url = baseUrl + 'book/';
        return {
            bookManage: { //客户管理
                insertBookInfo: function (bookInfo, stockInfo, success) {
                    console.log(bookInfo);
                    getDataWay(url + 'insertBookInfo', {
                        bookInfo: bookInfo,
                        stockInfo: stockInfo
                    }, 'PUT', success)
                },
                getAllBookByIsbn: function (isbn13, success) {
                    getDataWay(url + 'getAllBookByIsbn', {
                        isbn13: isbn13
                    }, 'GET', success)
                },

                returnBook: function (isbn, success) {
                    getDataWay(url + 'returnBook', {
                        isbn: isbn
                    }, 'POST', success)
                },
                getBookCase: function (libraryId, success) {
                    getDataWay(url + 'getBookCase', {
                        libraryId: libraryId
                    }, 'POST', success)
                },
                updateBookCase: function (libraryId, bookCase, success) {
                    getDataWay(url + 'updateBookCase', {
                        libraryId: libraryId,
                        bookCase: bookCase
                    }, 'POST', success)
                },
                getBookStockInfo: function (id, success) {
                    getDataWay(url + 'getBookStockInfo', {
                        id: id
                    }, 'GET', success)
                },
                insertUpdateBookNews: function (bookNewsData, success) {
                    getDataWay(url + 'insertUpdateBookNews', {
                        bookNewsData: bookNewsData
                    }, 'POST', success)
                },
                deleteBookNews: function (bookId, success) {
                    getDataWay(url + 'deleteBookNews', {
                        bookId: bookId
                    }, 'POST', success)
                }

            }
        }
    }());

    var user = (function () {
        var url = baseUrl + 'api/';
        return {
            userManage: { //客户管理
                getUserInfo: function (readerId, success) {
                    getDataWay(url + 'getUserInfo', {
                        readerId: readerId
                    }, 'GET', success)
                },
                vipBorrowReturn: function (userPhone, libraryId, success) {
                    getDataWay(url + 'vipBorrowReturn', {
                        userPhone: userPhone,
                        libraryId: libraryId
                    }, 'POST', success)
                },
                postUserData: function (userInfoData, returnBookId, borrowBookId, orderBookId, success) {
                    getDataWay(url + 'postUserData', {
                        userInfoData: userInfoData,
                        returnBookId: returnBookId,
                        borrowBookId: borrowBookId,
                        orderBookId: orderBookId
                    }, 'POST', success)
                },
            }
        }
    }());

    return {
        baseUrl: baseUrl,
        book: book,
        user: user
    }
});