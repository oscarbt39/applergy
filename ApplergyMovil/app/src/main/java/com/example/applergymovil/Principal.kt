package com.example.applergymovil

import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.applergymovil.adaptadores.AdaptadorProductos
import com.example.applergymovil.model.Prod
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.firestore
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class Principal : AppCompatActivity() {

    private lateinit var recycler: RecyclerView
    private lateinit var alergias: String
    private lateinit var prods: ArrayList<Prod>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_principal)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        recycler = findViewById(R.id.recyclerProds)
        var fire = com.google.firebase.Firebase.firestore
        var auth = FirebaseAuth.getInstance()

        val user = auth.currentUser


        lifecycleScope.launch {
            prods = getProds(fire)
            alergias = getAlergias(fire, user!!.email!!)


            filtro(fire)

            val customAdapter = AdaptadorProductos(prods)


            recycler.layoutManager = LinearLayoutManager(applicationContext)
            recycler.adapter = customAdapter

        }




    }

    private suspend fun filtro(fire: FirebaseFirestore) {
        var alergiasDiv: List<String> = alergias.split(",")


        var ingredientes: String = " "
        for (numId in alergiasDiv) {
            Log.d("T", "numAler:"+numId)

            val result = fire.collection("alergias")
                .whereEqualTo("allergy_id", numId.toString().replace(" ", "").toInt())
                .get()
                .await()

            for (documento in result) {
                Log.d("T", "detonantes:"+documento.get("detonantes").toString())
                ingredientes += documento.get("detonantes").toString() + ","
            }
        }
        Log.d("T", "ings:"+ingredientes)


        var newProds = ArrayList<Prod>()
        newProds.addAll(prods)

        Log.d("T", "newProds antes:"+newProds.size)
        for (prod in prods) {

            var lista1 = prod.ing.split(",")
            var lista2 = ingredientes.split(",")
            if (lista1.any { it in lista2 }) {
                newProds.remove(prod)
            }

        }
        Log.d("T", "newProds despues:"+newProds.size)

        prods.removeAll(prods)
        Log.d("T", "prods:"+prods.size)

        prods.addAll(newProds)
        Log.d("T", "prods:"+prods.size)


    }

    private suspend fun getProds(fire: FirebaseFirestore): ArrayList<Prod> {
        var prods: ArrayList<Prod> = ArrayList()
        val result = fire.collection("productos")
            .get()
            .await()

        try {
            for (documento in result) {
                var prod: Prod = Prod(documento.get("fullNom").toString(),
                    documento.get("precio").toString().toFloat(),
                    documento.get("imagen").toString(),
                    documento.get("ingredientes").toString())
                prods.add(prod)
            }
        } catch (e: Exception) {
            Log.d("T", "Error")
        }


        return prods
    }

    private suspend fun getAlergias(fire: FirebaseFirestore, email: String): String {
        var alergias: String = ""
        val result = fire.collection("usuarios")
            .whereEqualTo("email",email)
            .get()
            .await()

        try {
            for (documento in result) {
                alergias = documento.get("alergias").toString()
            }
        } catch (e: Exception) {
            Log.d("T", "Error")
        }


        return alergias
    }
}