import java.io.*;

public class Prime{
	
    public static void main() throws IOException{
	BufferedReader br = null;
	br = new BufferedReader(new InputStreamReader(System.in));
	int a=0;
	System.out.print("Input a number:");
	a = Integer.parseInt(br.readLine());
	int flag = 0;
	for(int i=2 ;i< a ;i++)
	{
	//=========== Write your code within the block ===========//
	//IGNORE
		if(a % i == 0)
		{
			flag ++;
		}	
	//END
	//========================================================//
		System.out.println(+flag);
	}

    }

}
