/**
 * @author https://github.com/LEODPEN
 * date: 2021/05
 */

 $(function(){
  $("#keyword").val("Please enter keywords").addClass("wait")
  .blur(function(){
    if($(this).val()==""){
      initDisplay();
      $("#keyword").val("Please enter keywords").addClass("wait");
    }
  }).focus(function(){
      if($(this).val()=="Please enter keywords"){
        $("#keyword").val("").removeClass("wait");
    }
  });
});

function initDisplay() {
    $(".tab-result").remove();
    $(document).unbind("keydown");
    // $(".bookmarks-result").remove();
    // $(".history-result").remove();
}

function judgeGo(){
    var word = $("#keyword").val().trim();
    if(word == "" && $("#keyword").hasClass("wait")){
      // alert("Please enter keywords first.");
      return;
    }
    initDisplay();
    if(word == "") {
      return;
    }
    goSearching(word.toUpperCase());
  }

// no btn needed
function goSearching(word) {
    queryTabs(word);
}

  $("#keyword").bind('keypress', function(e) {
      if (e.keyCode == 13) {
        judgeGo();
      }
  })

  $("#keyword").on('input', initDisplay);

  $("#keyword").bind('keydown', function(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      e.preventDefault();
    }
  });

  // focus at first
  $("#keyword").focus();

  /**
   * keyboard selection
   * @param  e 
   */
  function keyListener(e){
    var $list = $('.tab-result');
    var active = $list.children('.active'), index = active.index();
    // console.log(index);
    if (e.keyCode == 38) {
      e.stopPropagation();
      if (index > 0) {
        active.removeClass('active').prev().addClass('active');
      }
    } else if (e.keyCode == 40) {
      e.stopPropagation();
      if (index != -1 && index < ($list.children().length - 1)) {
        active.removeClass('active').next().addClass('active');
      }
    } else if (e.keyCode == 13) {
      e.stopPropagation();
      chrome.tabs.update(parseInt(active.attr('id'), 10), {active: true});
    }
  }


  function afterQuery(tabs) {
    var allRabs = $('.res-card');

    if (allRabs.length > 0) {
      $('#'+tabs[0].id).addClass('active');
      $(document).bind("keydown", keyListener);
    }
  }

  
  function queryTabs(keywords) {
    var tabs = [];
    traverseTabsOfCurWindow(function (tab) {
      if ((tab.title && tab.title.toUpperCase().indexOf(keywords) != -1)
        || (tab.url && tab.url.toUpperCase().indexOf(keywords) != -1)
        || (tab.pendingUrl && tab.pendingUrl.toUpperCase().indexOf(keywords) != -1)) {
        tabs.push(tab);
      }
    }, function () {
      $(".container").append('<div class="tab-result" id = "where-is-my-tab"> \n </div>');
      for (let j in tabs) {
        let tab = tabs[j];
        $('.tab-result').append('<div class = "res-card" id = "' + tab.id + '"' + '></div>');
        $("#" + tab.id).append('<div class = "t" >' + tab.title + '</div>');
        $("#" + tab.id).append('<div class = "url" >' + tab.url + '</div>');
        jump2Tab(tab.id);
      }
      afterQuery(tabs);
    });
  }

  function jump2Tab(tabid) {
    $('#'+tabid).on("click", function() {
      chrome.tabs.update(tabid, {active: true});
    });
  }


  function loadAllTabsInCurWindows() {
    let tabs = [];
    traverseTabsOfCurWindow(function (tab) {
          tabs.push(tab);
    }, function () {
       console.log(tabs);
    });
}

  /**
   * 从当前窗口遍历【默认】
   * @param  each 
   * @param  last 
   */
  function traverseTabsOfCurWindow(each, last) {
    var queryInfo = {
      // active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function (tabs) {
        for (let i in tabs) {
          let tab = tabs[i];
          each(tab);
        }
        if(last) {
          last();
        }
    });
  }

  /**
   * 从所有窗口遍历
   * @param each
   * @param last
   */
  function traverseTabsOfAllWindows(each, last) {
    chrome.windows.getAll({"populate": true}, function (windows) {
      for (let i in windows) {
        let tabs = windows[i].tabs;
        for (let j in tabs) {
          let tab = tabs[j];
          each(tab);
        }
      }
      if(last) {
          last();
      }
    })
  }