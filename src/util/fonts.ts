import { Inter, Poppins } from "next/font/google";

export const interFont = Inter({ 
    subsets: ["latin"],
    variable: '--font-inter'
});

export const poppinFont = Poppins({
    weight: ['300','400','500','600','700',"800"],
    style: ['italic','normal'],
    subsets: ['latin'],
    variable: '--font-poppins'
})