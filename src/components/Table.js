import React, { useState } from 'react'
import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import MyVerticallyCenteredModal from "./UserModal";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
// import { useGetUsersQuery } from '../redux/api';
import { changeIdFilterDir, addItemFullInfo, sortId, showFullInfo, hideFullInfo, prepareEdittingList } from '../redux/userSlice';
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";



export default function Table() {
    // const { data = [], isLoading } = useGetUsersQuery()
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    console.log(users.idFilterDir);
    // if(isLoading) return <Loader/> 
    const navigate = useNavigate()

    function filterId() {
        dispatch(changeIdFilterDir())
        dispatch(sortId())
    }

    function showItemInfo(item) {
        dispatch(addItemFullInfo(item))
        dispatch(showFullInfo())
    }
    function onEditHandler(item) {
        navigate(`/user-detail/${item.id}`)
        dispatch(addItemFullInfo(item))
        dispatch(prepareEdittingList(item))
    }

    return (
        <>
            {users.modalShow &&
                <MyVerticallyCenteredModal
                    show={users.modalShow}
                    onHide={() => dispatch(hideFullInfo())}
                />
            }
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={filterId} scope="col">
                            ID
                            {users.idFilterDir === 'desc' ? <TbArrowNarrowDown />
                                : <TbArrowNarrowUp />}
                        </th>

                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.data?.map((item) => {
                        const phoneNumber = `${item.phone.slice(0, 5)} ${item.phone.slice(5)}`
                        return <tr key={item.id + item.phone}>
                            <th scope="row">{item.id}</th>
                            <td onClick={() => showItemInfo(item)}>{item.firstName}</td>
                            <td onClick={() => showItemInfo(item)}>{item.lastName}</td>
                            <td onClick={() => showItemInfo(item)}>{item.email}</td>
                            <td onClick={() => showItemInfo(item)}>{phoneNumber}</td>
                            <td className="icons-cell">
                                <BsFillPencilFill
                                    onClick={() => onEditHandler(item)} className='pencil-icon' />
                                <BsTrashFill className='trash-icon' />
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </>
    )
}
