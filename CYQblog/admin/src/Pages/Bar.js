import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/echarts.css";

function Bar() {
  const [list, setList] = useState([]);
  const [typeName, setTypeName] = useState();
  const [listNum, setListNum] = useState();

  const [titleName, setTitleName] = useState();

  const [viewCount, setViewCount] = useState();

  useEffect(() => {
    getList();
  }, []);
  // 获取文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(res => {
      setList(res.data.list);
      console.log(res.data.list);

      const typeNames = res.data.list.map(i => i.typeName);
      var countedNames = typeNames.reduce(function(allNames, name) {
        if (name in allNames) {
          allNames[name]++;
        } else {
          allNames[name] = 1;
        }
        return allNames;
      }, {});
      const arr1 = [];
      const arr2 = [];
      for (let i in countedNames) {
        arr1.push(i);
        arr2.push(countedNames[i]);
      }
      setTypeName(arr1);
      setListNum(arr2);

      let titleName = res.data.list.map(obj => {
        return obj.title;
      });
      let viewCount = res.data.list.map(obj => {
        return obj.view_count;
      });
      setTitleName(titleName);
      setViewCount(viewCount);
    });
  };

  const getOption = () => {
    return {
      xAxis: {
        type: "category",
        data: typeName
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      series: [
        {
          data: listNum,
          type: "bar"
        }
      ]
    };
  };

  const getOptionView = () => {
    return {
      xAxis: {
        type: "category",
        data: titleName
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      series: [
        {
          data: viewCount,
          type: "line",
        }
      ]
    };
  };
  return (
    <div>
      <span>博文统计（个）</span>
      <ReactEcharts option={getOption()} className="echarts" />
      <span>浏览量统计（次）</span>
      <ReactEcharts option={getOptionView()} className="echartsView" />
    </div>
  );
}

export default Bar;
