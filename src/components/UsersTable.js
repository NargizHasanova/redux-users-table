import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import MyVerticallyCenteredModal from "./UserModal";
import { useNavigate } from 'react-router-dom'
// import { useGetUsersQuery } from '../redux/api';
import { changeIdFilterDir, addItemFullInfo, sortId, showFullInfo, hideFullInfo, prepareEdittingList, deleteUser, paginate } from '../redux/userSlice';
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space, message, Pagination } from 'antd';
const { confirm } = Modal



export default function UsersTable() {
    // const { data = [], isLoading } = useGetUsersQuery()
    // if(isLoading) return <Loader/> 
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const indexOfLastPost = users.currentPage * users.postsPerPage
    const indexOfFirstPost = indexOfLastPost - users.postsPerPage
    console.log(indexOfFirstPost, indexOfLastPost);
    const currentPosts = users.data.slice(indexOfFirstPost, indexOfLastPost)

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

    const confirmDelete = (userName) => {
        confirm({
            title: `Do you want to delete ${userName}?`,
            icon: <ExclamationCircleOutlined className="nese" />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            okText: "Yes",

            onOk() {
                dispatch(deleteUser(userName))
                setTimeout(() => {
                    message.success("User successfully deleted")
                }, 500);

            },
            onCancel() { },
        })
    }

    return (
        <>
            {users.modalShow &&
                <MyVerticallyCenteredModal
                    show={users.modalShow}
                    onHide={() => dispatch(hideFullInfo())}
                />
            }
            <h1 className="table-title">Daxili İşlər Nazirliyi</h1>
            <div className="container">
                <table className="table ">
                    <thead>
                        <tr>
                            <th onClick={filterId} scope="col">
                                ID
                                {/* {users.idFilterDir === 'desc' ? <TbArrowNarrowDown />
                                : <TbArrowNarrowUp />} */}
                            </th>

                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts?.map((item, index) => {
                            const phoneNumber = `${item.phone.slice(0, 5)} ${item.phone.slice(5)}`
                            return (
                                <tr key={item.id + item.phone}>
                                    <th scope="row">
                                        {users.currentPage === 1
                                            ? index + 1
                                            : (users.currentPage - 1) * users.postsPerPage + index + 1}
                                    </th>
                                    <td onClick={() => showItemInfo(item)}>{item.firstName}</td>
                                    <td onClick={() => showItemInfo(item)}>{item.lastName}</td>
                                    <td onClick={() => showItemInfo(item)}>{item.email}</td>
                                    <td onClick={() => showItemInfo(item)}>{phoneNumber}</td>
                                    <td className="icons-cell">
                                        <BsFillPencilFill
                                            onClick={() => onEditHandler(item)} className='pencil-icon' />
                                        <Space wrap>
                                            <BsTrashFill
                                                className='trash-icon'
                                                onClick={() => confirmDelete(item.firstName)} />
                                        </Space>
                                    </td>
                                </tr>)
                        })}

                    </tbody>
                </table>
                <Pagination
                    className="pagination-tab"
                    defaultCurrent={users.currentPage}
                    total={users.data.length}
                    onChange={(curPage) => dispatch(paginate(curPage))}
                />
            </div>
        </>
    )
}
