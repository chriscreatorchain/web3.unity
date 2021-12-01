using System.IO;
using UnityEditor;
using UnityEngine;

namespace Web3Unity.Scripts.Editor
{
    public class CopyWebTemplate : UnityEditor.Editor
    {
        [MenuItem("Web3Unity/Copy Template")]
        static void CopyTemplate()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            CopyFilesRecursively($"{currentDirectory}/web3.unity/WebGLTemplates", $"{currentDirectory}/Assets/WebGLTemplates");
        }
        
        [MenuItem("Web3Unity/Update Static 2020")]
        static void CopyTemplateStatic2020()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            CopyFilesRecursively($"{currentDirectory}/web3.unity/WebGLTemplates/Web3GL-2020/static", $"{currentDirectory}/Assets/WebGLTemplates/Web3GL-2020/static");
        }
        
        [MenuItem("Web3Unity/Update Static 2019")]
        static void CopyTemplateStatic2019()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            CopyFilesRecursively($"{currentDirectory}/web3.unity/WebGLTemplates/Web3GL-2019/static", $"{currentDirectory}/Assets/WebGLTemplates/Web3GL-2019/static");
        }
        
        private static void CopyFilesRecursively(string sourcePath, string targetPath)
        {
            //Now Create all of the directories
            foreach (string dirPath in Directory.GetDirectories(sourcePath, "*", SearchOption.AllDirectories))
            {
                Directory.CreateDirectory(dirPath.Replace(sourcePath, targetPath));
            }

            //Copy all the files & Replaces any files with the same name
            foreach (string newPath in Directory.GetFiles(sourcePath, "*.*",SearchOption.AllDirectories))
            {
                File.Copy(newPath, newPath.Replace(sourcePath, targetPath), true);
            }
        }
    }
}