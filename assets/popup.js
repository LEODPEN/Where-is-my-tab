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
    $("p").remove();
    $(".tab-result").remove();
    $(".bookmarks-result").remove();
    $(".history-result").remove();
}

function judgeGo(){
    var word = $("#keyword").val().trim();
    if(word == "" && $("#keyword").hasClass("wait")){
      alert("Please enter keywords first.");
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

  document.onkeydown=keyListener;

  function keyListener(e){ 
    if(e.keyCode == 13){ 
        judgeGo();
    } 
  }

  function loadAllTabsInCurWindows() {
      let tabs = [];
      traverseTabsOfCurWindow(function (tab) {
            tabs.push(tab);
      }, function () {
         console.log(tabs);
      });
  }

  function queryTabs(keywords) {
    let tabs = [];
    traverseTabsOfCurWindow(function (tab) {
      if ((tab.title && tab.title.toUpperCase().indexOf(keywords) != -1)
        || (tab.url && tab.url.toUpperCase().indexOf(keywords) != -1)
        || (tab.pendingUrl && tab.pendingUrl.toUpperCase().indexOf(keywords) != -1)) {
        tabs.push(tab);
      }
    }, function () {
      $(".container").append('<div class="tab-result"></div>');
      for (let j in tabs) {
        let tab = tabs[j];
        $('.tab-result').append('<p id = "' + tab.id + '"' + '>' + tab.title + '</p>');
        jump2Tab(tab.id);
      }
    });
  }

  function jump2Tab(tabid) {
    document.getElementById(tabid).addEventListener("click", function() {
      chrome.tabs.update(tabid, {active: true});
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