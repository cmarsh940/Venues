export class Vendor {
         _id: any;
         name: string;
         email: string;
         phone: string;
         address: string;
         city: string;
         state: string;
         website: string;
         video_url: string;
         _category: { _id: string; name: string; createdAt: any; updatedAt: any };
         description: string;
         facebook_url: any;
         instagram_url: any;
         pic_url: any;
         gallery: [{ name: string }];
         services: any[];
         createdAt: any;
         updatedAt: any;
       }