import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

const GuestRoute = ({ children }) => {
    const authSelector = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const location = useLocation()

    if (authSelector.RoleId === 3 || authSelector.RoleId === 2) {
        navigate("/admin/dashboard")
    } else if (authSelector.id && location.state?.from) {
        navigate(location.state.from)
    } else if (authSelector.id) {
        navigate("/")
    }
    return children
}

export default GuestRoute
