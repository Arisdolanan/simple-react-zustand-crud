import React, { useState, useEffect } from "react";
import { useStudentStore, useGlobalStore } from "@/stores";
import { QRCodeCanvas } from "qrcode.react";

import Modal from "@/components/Modal";
import { Loading } from "@/components/Loading";

export default function Student() {
  const [getAllStudent, getAllStudentAPI, getAllStudentByIdAPI, addStudentAPI, updateStudentAPI, deleteStudentAPI] = useStudentStore((state) => [
    state.student,
    state.getStudent,
    state.getStudentById,
    state.addStudent,
    state.updateStudent,
    state.deleteStudent,
  ]);
  const [getModalStore, setModalStore] = useGlobalStore((state) => [state.isOpenModal, state.setOpenModal]);

  const [choose, setChoose] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [tempItem, setTempItem] = useState({
    id: 0,
    name: "",
    email: "",
    gender: "",
    address: "",
  });

  const toggleModal = (data, id) => {
    switch (data) {
      case 0:
        setChoose(0);
        break;
      case 1:
        setChoose(1);
        getStudentByIdAPI(id);
        break;
      case 2:
        setChoose(2);
        setItemId(id);
        break;
    }
    setModalStore(!getModalStore);
    clearForm();
  };

  const getStudentByIdAPI = async (id) => {
    const data = await getAllStudentByIdAPI(id);
    setTempItem(data);
  };

  const handleChange = (e) => {
    setTempItem({ ...tempItem, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    const data = {
      id: 0,
      name: "",
      email: "",
      gender: "",
      address: "",
    };
    setTempItem(data);
  };

  const updateConfirm = async () => {
    await updateStudentAPI(tempItem);
    setModalStore(!getModalStore);
    clearForm();
  };

  const addConfirm = async () => {
    const data = {
      id: getAllStudent.length + 1,
      name: tempItem.name,
      email: tempItem.email,
      gender: tempItem.gender,
      address: tempItem.address,
    };
    await addStudentAPI(data);
    setModalStore(!getModalStore);
    clearForm();
  };

  const deleteConfirm = async () => {
    await deleteStudentAPI(itemId);
    setModalStore(!getModalStore);
  };

  useEffect(() => {
    if (getAllStudent.length === 0) {
      getAllStudentAPI();
    }
  }, []);

  return (
    <div>
      <div className="row">
        <button onClick={() => toggleModal(0, null)}>Add Data</button>
        <Modal isOpen={getModalStore} toggleModal={toggleModal}>
          {choose == 0 && (
            <div>
              <div>
                <div className="row">
                  <label>Name:</label>
                  <input type="text" id="name" name="name" value={tempItem.name || ""} onChange={handleChange} />
                  <label>NIM:</label>
                  <input type="text" id="nim" name="nim" value={tempItem.nim || ""} onChange={handleChange} />
                  <label>Email:</label>
                  <input type="text" id="email" name="email" value={tempItem.email || ""} onChange={handleChange} />
                  <label>Gender:</label>
                  <input type="text" id="gender" name="gender" value={tempItem.gender || ""} onChange={handleChange} />
                  <label>Address:</label>
                  <input type="text" id="address" name="address" value={tempItem.address || ""} onChange={handleChange} />
                </div>
                <button onClick={toggleModal}>Cancel</button>
                <button onClick={addConfirm}>Add</button>
              </div>
            </div>
          )}
          {choose == 1 && (
            <div>
              <div className="row">
                <label>Name:</label>
                <input type="text" id="name" name="name" value={tempItem.name || ""} onChange={handleChange} />
                <label>NIM:</label>
                <input type="text" id="nim" name="nim" value={tempItem.nim || ""} onChange={handleChange} />
                <label>Email:</label>
                <input type="text" id="email" name="email" value={tempItem.email || ""} onChange={handleChange} />
                <label>Gender:</label>
                <input type="text" id="gender" name="gender" value={tempItem.gender || ""} onChange={handleChange} />
                <label>Address:</label>
                <input type="text" id="address" name="address" value={tempItem.address || ""} onChange={handleChange} />
              </div>
              <button onClick={toggleModal}>Cancel</button>
              <button onClick={updateConfirm}>Update</button>
            </div>
          )}
          {choose == 2 && (
            <div>
              <div className="content">Apakah anda yakin ingin menghapus item ini {itemId} ?</div>
              <button onClick={toggleModal}>Cancel</button>
              <button onClick={deleteConfirm}>Delete</button>
            </div>
          )}
        </Modal>
      </div>
      <div className="row">
        {getAllStudent.length > 0 &&
          getAllStudent.map((data) => (
            <div className="column" key={data.id}>
              <div className="card">
                <div className="container">
                  <p>name: {data.name}</p>
                  <p>email: {data.email}</p>
                  <p>gender: {data.gender}</p>
                  <p>address: {data.address}</p>
                  <QRCodeCanvas value={data.nim} />
                  <div className="row">
                    <button onClick={() => toggleModal(1, data.id)}>Edit</button>
                    <button onClick={() => toggleModal(2, data.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!getAllStudent.length > 0 && <Loading />}
      </div>
      <Modal />
    </div>
  );
}
