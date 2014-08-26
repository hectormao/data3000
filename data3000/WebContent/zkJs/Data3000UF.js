zk.afterMount(function() {
    
	//Upload Progress Monitor Sample 2
    zk.Data3000UF = zk.$extends(zk.Object, {
        updated : null,
        $init : function(uplder, filenm) {
            this._uplder = uplder;
            var id = uplder.id, 
                uri = 'img/otros/upload-loader.gif', 
                html = ['<div id="', id,'" style="font-family: Arial,Sans-serif;font-size: 12px;font-weight: normal;">',
                        '<image style="float: left;" src="' , uri, '"/>',
                        //'<div class="float-left">&nbsp;&nbsp;&nbsp;FileName: ', filenm , '</div>',
                        '<div style="float: right;">', 
                        //msgzk.FILE_SIZE, 
                        '&nbsp;&nbsp;&nbsp;',
                        '<span id="' , id, '-sent">0</span> de ',
                        '<span id="' , id, '-total">0</span>',
                        '<span id="' , id, '-percent"> (0%)</span>',
                        '</div><div style="clear: both;"></div></div>'].join("");
            jq("$progreso").append(html);
            this.viewer = jq('#' + id)[0];          
        },
        update : function(sent, total) {
            jq('#' + this._uplder.id + '-sent').html(Math.round((total / 1024) * sent / 100) + msgzk.KBYTES);
            if (!this.updated) {
                this.updated = true;
                jq('#' + this._uplder.id + '-total').html(Math.round(total / 1024) + msgzk.KBYTES);
            }
            jq('#' + this._uplder.id + '-percent').html(" (" +sent + "%" + ")");
        },
        destroy : function() {
            jq(this.viewer).slideUp(1000);
        }
    });
});