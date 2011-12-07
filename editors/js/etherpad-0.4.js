(function($) {

Drupal.wysiwyg.editor.init.etherpad_lite = function(settings) {

}
	

function getPadContents(padid, callback, async) {
    if (typeof(async)=="undefined")
	async = true;
    url = Drupal.settings.basePath+"localedit/get/";
    data = {
	"padid": padid 
    };
    var _call = callback;
    $.ajax({
	       "url":url,
	       "type":"POST",
	       "data":data,
	       "async":async,
	       "dataType":"json",
	       "success" : function(data) {
		   _call(data.content);
	       }
	   });
}

function setPadContents(padid, nid, content) {
    url = Drupal.settings.basePath+"localedit/set/"+nid;
    data = {
	"padid": padid,
	"content": content,
    };
    $.ajax({
	       "url":url,
	       "type":"POST",
	       "data":data,
	       "dataType":"json",
	       "success" : function(data) {
	       }
	   });
}

/**
 * Attach this editor to a target element.
 */
Drupal.wysiwyg.editor.attach.etherpad_lite = function(context, params, settings) {
  editorid = "#"+params.field;
  newID = params.field+"-editor";
  $(editorid).after($("<div>").attr("id", params.field+"-editor").attr("class","pad"));
  obj = $(editorid).next();
  egid = $("#etherpad_gid").val();
  nid = $("#etherpad_nid").val();
  padid =  egid+"$"+params.field;
  if (typeof(egid) != "undefined") {
	  $(obj).pad({
			'padId': padid,
			'host':settings.host, 
			'showChat':'true', 
			'showControls':'true',
			 'showLineNumbers'  : true,
			 'userName'	 : settings.user,
			});
	  if (typeof(nid)!="undefined" && nid.length>0) {
	          getPadContents(padid, function(txt) {
			if (txt.length==1) {
			    setPadContents(padid, nid, $(editorid).val());
			}			
		  });
	  }
	  $(editorid).hide(); 
  }
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.detach.etherpad_lite = function(context, params) {
  egid = $("#etherpad_gid").val();
  padid =  egid+"$"+params.field;
  editorid = "#"+params.field;
  newID = editorid+"-editor";
  getPadContents(padid, function(content) {
	$(editorid).val(content);
	$(newID).hide();
	$(editorid).show();
  }, false);
};

})(jQuery);
