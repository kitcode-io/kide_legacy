import java.io.*;

public class Palindrome
{
	public int rev(int a)
	{
		int b=121;
		return b;
	}
	public int check(int a,int b)
	{
		if(a==b)
		{
                        return 1;
		}
		else
		{
                        return 0;
	        }
       }

       public static void main() throws java.io.IOException{
         System.out.println("input a number"); 
	 BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
	 int a=Integer.parseInt(br.readLine());
         Palindrome obj = new  Palindrome();
         int b = obj.rev(a);
         int check= obj.check(a, b);

         if(check == 1){
           System.out.println("palindrome");
         } else {
           System.out.println("not palindrome");
         } 
       }
}
