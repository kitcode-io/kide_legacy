import java.io.*;
import java.util.*;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.Description;
import java.lang.reflect.*;

public class HelloWorldTest extends Base
 {

   @Test
   public void t1() throws java.io.IOException{
	hint = new Scanner(new File("Hint/h1.txt")).useDelimiter("\\Z").next();
        description = "Create a main method";
	HelloWorld obj = new HelloWorld();
	try {
		Method m=getMethod(obj,"main");
	        assertEquals(m.getName(),"main");
     

    		}
        
	catch(Exception e){}
    
        }

   
 

    @Test
   public void t2() throws java.io.IOException{
	hint = new Scanner(new File("Hint/h2.txt")).useDelimiter("\\Z").next();
        description = "Print 'Hello World!'";
	HelloWorld obj = new HelloWorld();
	try {
		Method m=getMethod(obj,"main");
		if(m!= null)
		{
		m.invoke(obj);
	        assertEquals("Hello World!\n", outContent.toString());
     

    		}
        }
	catch(Exception e){}
    
        }
  
 }


    

