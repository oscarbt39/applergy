package com.example.applergymovil.adaptadores

import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.example.applergymovil.R
import com.example.applergymovil.model.Prod
import com.google.android.material.chip.Chip
import com.squareup.picasso.Picasso

class AdaptadorProductos(private val dataSet: ArrayList<Prod>) :
    RecyclerView.Adapter<AdaptadorProductos.ViewHolder>() {

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder)
     */
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val img: ImageView
        val title: TextView
        val second: TextView

        init {
            img = view.findViewById(R.id.img)
            title = view.findViewById(R.id.title)
            second = view.findViewById(R.id.secondTitle)
        }
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.prods, viewGroup, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {



        Picasso.get().load(dataSet[position].img).into(viewHolder.img);
        viewHolder.title.text = dataSet[position].nom
        viewHolder.second.text = "${dataSet[position].precio.toString()}€"
    }

    override fun getItemCount() = dataSet.size

}