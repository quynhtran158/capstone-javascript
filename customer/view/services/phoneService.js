/*Service class provides 2 methods:
*getPhones gets a list of phones
*getPhoneById gets a specific phone by its ID
*/
export class Service {
    getPhones = async () => {
      try {
        const res = await axios({
          url: 'https://64e41e8fc55563802912cf83.mockapi.io/Products',
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `https://64e41e8fc55563802912cf83.mockapi.io/Products/${id}`,
          method: 'GET',
        });
  
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  }
  