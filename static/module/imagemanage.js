/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');
    var imageUrl = '';
    var imageDialog = {};
    var imageId = '';
    var operationType = 1;

    $('.add-image').click(function () {
        operationType = 1;
        $('.form-control.news-url').val('');
        imageDialog = layer.open({
            title: '书籍信息展示',
            type: 1,
            area: ['36%', '50%'], //宽高
            content: $('#image-add-dialog')
        });
    });

    $('.form-control.image-url').change(function () {
        $('#taskImageUrl').ajaxSubmit({
            success: function (data) {
                imageUrl = data;
                layer.msg('上传成功!', {icon: 1, time: 1000})
            }, error: function (e) {
                layer.msg('上传失败!', {icon: 5, time: 1000})
            }
        });
    });
    getAllImage();

    function getAllImage() {
        api.book.bookManage.listImageInformation(function (rep) {
            var repLen = rep.length;
            var domImage = [];
            for (var i = 0; i < repLen; i++) {
                domImage.push('<div class="image-item"> ' +
                    '            <img class="" src="http://121.43.171.195:8080/dummy-path/' + rep[i].sysImageUrl + '" alt=""> ' +
                    '            <div class="icon-setting"> ' +
                    '                <span class="glyphicon glyphicon glyphicon-trash span-icon-cursor span-red" data-id="' + rep[i].id + '"></span> ' +
                    '                <span class="glyphicon glyphicon glyphicon-cog span-icon-cursor span-blue" ' +
                    'data-id="' + rep[i].id + '" data-image-url="' + rep[i].sysImageUrl + '" data-news-url="' + rep[i].newsUrl + '"></span> ' +
                    '            </div> ' +
                    '        </div>');
            }
            $('.image-show').empty();
            $('.image-show').append(domImage.join(''));
        });
    }

    $('.image-show').on('click', '.span-red', function () {
        var id = $(this).attr('data-id');
        api.book.bookManage.removeImageInformation(id, function (rep) {
            getAllImage();
        });
    });

    $('.image-show').on('click', '.span-blue', function () {
        imageId = $(this).attr('data-id');
        imageDialog = layer.open({
            title: '书籍信息展示',
            type: 1,
            area: ['36%', '50%'], //宽高
            content: $('#image-add-dialog')
        });
        var newsUrl = $(this).attr('data-news-url');
        $('.form-control.news-url').val(newsUrl);
        var imageUrlData = $(this).attr('data-image-url');
        imageUrl = imageUrlData;
        operationType = 0;
    });

    $('#post-image-data').click(function () {
        var newsUrl = $('.form-control.news-url').val();
        var imageInfo = {
            sysImageUrl: imageUrl,
            newsUrl: newsUrl
        };
        if (!operationType) {
            imageInfo.id = imageId;
        }
        api.book.bookManage.saveImageUrl(JSON.stringify(imageInfo), function (rep) {
            layer.close(imageDialog);
            getAllImage();
        });
    });
});
