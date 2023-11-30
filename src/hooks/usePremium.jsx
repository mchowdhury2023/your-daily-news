import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const usePremium = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremiumMember'],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/membership/${user.email}`);
            return response.data.isPremiumMember; // Directly returning the boolean value
        },
        onError: (error) => {
            console.error('Error fetching premium status:', error);
        }
    });

    // Return an object with isPremiumMember and isPremiumLoading
    return { isPremiumMember: data, isPremiumLoading };
}

export default usePremium