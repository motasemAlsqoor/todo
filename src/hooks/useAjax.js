import axios from "axios";
import { useState, useEffect } from "react";

const useAjax = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    //api call to load data from https://api-server13.herokuapp.com/api/v1/todo
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setData(data);
      } catch (error) {
        console.log("Error : ", error.message());
      }
    };
    getData();
  }, []);
  const post = async (item) => {
    const response = await axios.post(url, item);
    item = response.data;
    setData([...data, item]);
  };
  const update = async (id, item) => {
    const response = await axios.put(url + "/" + id, item);
    const updatedItem = response.data;
    //console.log(updatedItem);
    const newData = data.map((item) => {
      if (item._id == updatedItem._id) {
        return updatedItem;
      } else return item;
    });
    setData(newData);
  };
  const _delete = async (id) => {
    const response = await axios.delete(url + "/" + id);
    if (response.status == 200) {
      let newData = data.filter((item) => item._id != id);
      //console.log(newList.length);
      setData(newData);
    }
  };
  return [data, post, update, _delete];
};
export default useAjax;
