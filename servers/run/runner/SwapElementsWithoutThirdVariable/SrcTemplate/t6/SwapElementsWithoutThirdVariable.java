import java.io.*;

public class SwapElementsWithoutThirdVariable{
	
    public static void main(String args[]) throws IOException{
	BufferedReader br = null;
	br = new BufferedReader(new InputStreamReader(System.in));
	int a = 0,b = 0;
	System.out.println("Enter the value of a:");
	a = Integer.parseInt(br.readLine());
	System.out.println("Enter the value of b:");
	b = Integer.parseInt(br.readLine());

	a = a+b;
	//============== Write your code within the block =======//
	b = a-b;
	//======================================================//
	//IGNORE
	System.out.println(b);
	//END
    }

}

