import axios from "axios";
import notif from "../components/Notifikasi";

const url = axios.create({
  baseURL: "http://localhost:3200/",
});

export default {
  register: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post("register", {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          console.log(res);
          notif.succes("Berhasil register");
          resolve(true);
        })
        .catch((error) => {
          notif.error(error.response.data.message);
          reject(false);
        });
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      url
        .post("login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          console.log("login succes ==>", res.data);
          notif.succes("Berhasil login");
          localStorage.setItem("token", res.data.token);
          resolve(true);
        })
        .catch((error) => {
          notif.error(error.response.data.message);
          reject(false);
        });
    });
  },
  hapusAkun: (id) => {
    return new Promise((resolve, reject) => {
      url
        .delete(`delete/${id}`)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(false);
        });
    });
  },
  changePw: (data, id) => {
    return new Promise((resolve, reject) => {
      url
        .post(`change_pw/${id}`, {
          password: data.lastPassword,
        })
        .then(() => {
          url
            .put(`update_pw/${id}`, {
              password: data.newPassword,
            })
            .then(() => {
              notif.succes("Berhasil ganti kata sandi");
              resolve(true);
            })
            .catch((error) => {
              console.log(error.response);
              reject(false);
            });
        })
        .catch((error) => {
          notif.error(error.response.data.message);
        });
    });
  },
  getOne: (id) => {
    return new Promise((resolve, reject) => {
      url
        .get(`getOne/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          reject(false);
        });
    });
  },
  updateProfil: (id, image) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("image", image);
      url
        .put(`update_profil/${id}`, dataForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Berhasil perbarui avatar");
          notif.succes(res.data.message);
          resolve(true);
        })
        .catch((err) => {
          console.log("gagal");
          notif.error("Anda belum memilih gambar");
          reject(false);
        });
    });
  },
  updateData: (data, id) => {
    return new Promise((resolve, reject) => {
      url
        .put(`update_data_user/${id}`, {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        })
        .then((res) => {
          console.log("Berhasil perbarui profil");
          notif.succes(res.data.message);
          resolve(true);
        })
        .catch((err) => {
          console.log("gagal");
          notif.error(err.response.data.message);
          reject(false);
        });
    });
  },
};
