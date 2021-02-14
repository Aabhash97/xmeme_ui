import axios from "axios";
const url = "https://xmeme-api10.herokuapp.com/memes";

class XmemeService {
  async getMemes() {
    let result = {
      data: [],
      message: "",
      type: "",
    };
    await axios
      .get(url)
      .then((response) => {
        result.data = response.data;
        if (response.status === 200 ) {
          result.message = "Welcome to XMEME STTREAMER";
          result.type = "Success";
        }
      })
      .catch(function handle(error) {
        result.type = "Error";
        if (error.response) {
          result.message = "Some Error has been occured";
          console.log("Some Error has been occured");
        } else if (error.request) {
          result.message = "Cannot connect to API";
          console.log(error.request);
        } else {
          console.log("Error", result.message);
          result.message = "Some Error has been Occured";
        }
      });
    return result;
  }

  async submitMemes(memes) {
    let result = {
      message: "",
      type: ""
    };
    await axios
      .post(url, memes)
      .then(response => {
        result.message = "Meme Recieved";
        result.type = "Success";    
      })
      .catch(function handle(error) {
        result.type = "Error";
        if (error.response) {
          if (error.response.status === 409) {
            result.message = "Meme already EXist";
            console.log("Some Error has been occured");
          } else {
            result.message = "Memes Cannot be Sumited";
          }
        } else if (error.request) {
          result.message = "Cannot connect to API";
          console.log(error.request);
        } else {
          console.log("Error", error.message);
          result.message = "Meme not created Unknown error";
        }
      });
  }

  async UpdateMemes(memes, id) {
    let result = {
      data: [],
      message: "",
      type: "",
    };
    await axios.patch(url + "/" + id, memes).then(response => {
      result.message = "Meme Recieved";
      result.type = "Success";
    }).catch(function handle(error) {
      result.type = "Error";
      if (error.response) {
        if (error.response.status === 409) {
          result.message = "Meme already EXist";
          console.log("Some Error has been occured");
        }
        else if (error.response.status ===404)
        {
          result.message = "Meme not Found"
        } 
        else {
          result.message = "Memes Cannot be Sumited";
        }
      } else if (error.request) {
        result.message = "Cannot connect to API";
        console.log(error.request);
      } else {
        console.log("Error", error.message);
        result.message = "Meme not Updated Unknown error";
      }
    });
  }

  async getMemesById(id) {
    let result = {
      data: [],
      message: "",
      type: "",
    };
    await axios.get(url + "/" + id).then((response) => {
      result.data = response.data;
      if (response.status === 200) {
        result.message = "Meme Recieved";
        result.type = "Success";
      }
    }).catch(function handle(error) {
      result.type = "Error";
      if (error.response) {
        if (error.response.status === 404) {
          result.message = "Meme Not Found";
          console.log("Some Error has been occured");
        } else {
          result.message = "Memes Cannot be Sumited";
        }
      } else if (error.request) {
        result.message = "Cannot connect to API";
        console.log(error.request);
      } else {
        console.log("Error", error.message);
        result.message = "Meme not Fetched Unknown error";
      }
    });
    return result;
  }
}
export default new XmemeService();
