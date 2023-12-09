import Swal from 'sweetalert2';

export const updateUserMembership = async (axiosPublic,email, status, taken, setUserState = () => {}) => {

    console.log("Type of setUserState:", typeof setUserState);
    try {
      
      const subscriptionStartTime = Date.now();


      const response = await axiosPublic.patch(`/updatesubscription/${email}`, { 
                              membershipStatus: status, 
                              membershipTaken: taken,
                              subscriptionStartTime
                             });
    
      // Check if the update was successful
      if (response.data.modifiedCount > 0 ) {
        setUserState({ ...response.data.user, membershipStatus: status });
        // Show success alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your subscription has been added. You are a premium member now.",
          showConfirmButton: false,
          timer: 1500,
        });
      }

    }
  
      catch(error) {
      
        console.error('Error updating membership:', error);
      };
  };
