import java.io.*;

public class Niven{
	
    public static void main() throws IOException{
	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	int n;
	System.out.print("Enter a number:");
	n = Integer.parseInt(br.readLine());
	int c, d, sum = 0;
	c = n;
	while(c>0)
        {	
	//=========== Write your code within the block ===========//
	//IGNORE
	 	d = c%10;
         	sum = sum + d;
         	c = c/10;
	//END
	//========================================================//
		System.out.println(sum);
	}

    }

}
